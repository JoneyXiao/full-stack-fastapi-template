import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import i18n from "i18next"

import {
  type Body_login_login_access_token as AccessToken,
  LoginService,
  type UserPublic,
  type UserRegister,
  UsersService,
} from "@/client"
import { type SupportedLocale, setStoredLocale } from "@/lib/locale"
import { handleError } from "@/utils"
import useCustomToast from "./useCustomToast"

const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null
}

/**
 * Sync locale from user profile to local storage and i18next
 */
const syncLocaleFromUser = (user: UserPublic | null) => {
  if (user?.locale) {
    const userLocale = user.locale as SupportedLocale
    setStoredLocale(userLocale)
    i18n.changeLanguage(userLocale)
    document.documentElement.lang = userLocale
  }
}

const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { showErrorToast } = useCustomToast()

  const { data: user } = useQuery<UserPublic | null, Error>({
    queryKey: ["currentUser"],
    queryFn: UsersService.readUserMe,
    enabled: isLoggedIn(),
  })

  const signUpMutation = useMutation({
    mutationFn: (data: UserRegister) =>
      UsersService.registerUser({ requestBody: data }),
    onSuccess: () => {
      navigate({ to: "/login" })
    },
    onError: handleError.bind(showErrorToast),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const login = async (data: AccessToken) => {
    const response = await LoginService.loginAccessToken({
      formData: data,
    })
    localStorage.setItem("access_token", response.access_token)
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      // Fetch user and sync locale from their profile
      const user = await queryClient.fetchQuery({
        queryKey: ["currentUser"],
        queryFn: UsersService.readUserMe,
      })
      syncLocaleFromUser(user)
      navigate({ to: "/dashboard" })
    },
    onError: handleError.bind(showErrorToast),
  })

  const logout = () => {
    localStorage.removeItem("access_token")
    queryClient.setQueryData(["currentUser"], null)
    queryClient.removeQueries({
      predicate: (query) => query.queryKey[0] !== "currentUser",
    })
    navigate({ to: "/" })
  }

  return {
    signUpMutation,
    loginMutation,
    logout,
    user,
  }
}

export { isLoggedIn }
export default useAuth
