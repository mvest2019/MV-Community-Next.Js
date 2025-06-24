"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

interface UseAuthActionReturn {
  executeWithAuth: (action: () => void, actionName: string, onSuccess?: () => void) => void
  loginPopupState: {
    isOpen: boolean
    actionMessage: string
    pendingAction: (() => void) | null
    onSuccess?: (() => void) | null
  }
  closeLoginPopup: () => void
  handleLoginSuccess: () => void
}

export function useAuthAction(): UseAuthActionReturn {
  const { checkAuth } = useAuth()
  const [loginPopupState, setLoginPopupState] = useState({
    isOpen: false,
    actionMessage: "",
    pendingAction: null as (() => void) | null,
    onSuccess: null as (() => void) | null,
  })

  const executeWithAuth = (action: () => void, actionName: string, onSuccess?: () => void) => {
    if (checkAuth()) {
      // User is logged in, execute action immediately
      action()
      if (onSuccess) onSuccess()
    } else {
      // User is not logged in, show login popup
      setLoginPopupState({
        isOpen: true,
        actionMessage: actionName,
        pendingAction: action,
        onSuccess: onSuccess || null,
      })
    }
  }

  const closeLoginPopup = () => {
    setLoginPopupState({
      isOpen: false,
      actionMessage: "",
      pendingAction: null,
      onSuccess: null,
    })
  }

  const handleLoginSuccess = () => {
    // Execute the pending action after successful login
    if (loginPopupState.pendingAction) {
      loginPopupState.pendingAction()
    }
    // Execute additional success callback
    if (loginPopupState.onSuccess) {
      loginPopupState.onSuccess()
    }
    closeLoginPopup()
  }

  return {
    executeWithAuth,
    loginPopupState,
    closeLoginPopup,
    handleLoginSuccess,
  }
}
