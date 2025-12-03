"use client"

import React, { useState } from "react"
import {
  Menu,
  Bell,
  User,
  LogOut,
  Home,
  MessageSquare,
  Settings,
} from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

const SideBar: React.FC = () => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  // LÓGICA CLAVE:
  // Usamos siempre 'justify-start'.
  // isExpanded ? 'pl-6' (alineación izquierda estándar) : 'pl-7' (calculado para centrar en w-20)
  // Esto elimina el "salto" visual.
  const paddingClass = isExpanded ? "pl-6" : "pl-7"
  
  const navItemClasses = `flex items-center w-full py-3 cursor-pointer transition-all duration-300 ${paddingClass} hover:bg-gray-50`

  return (
    <div
      className={`flex flex-col justify-between h-full bg-white shadow-xl py-6 fixed left-0 top-0 rounded-r-3xl z-50 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Upper Section */}
      <div className="flex flex-col space-y-4 w-full">
        {/* Menu Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center w-full py-2 text-gray-700 hover:text-green-600 transition-all duration-300 focus:outline-none ${paddingClass}`}
        >
          <Menu className="w-6 h-6 min-w-[24px]" />
          <span
            className={`ml-4 font-medium overflow-hidden transition-all duration-300 whitespace-nowrap ${
              isExpanded ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
            }`}
          >
            Menu
          </span>
        </button>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2 w-full mt-6">
          <div
            onClick={() => handleNavigation("/dashboard")}
            className={`${navItemClasses} text-gray-700 hover:text-green-600`}
          >
            <Home className="w-6 h-6 min-w-[24px]" />
            <span
              className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              Dashboard
            </span>
          </div>

          <div
            onClick={() => handleNavigation("/dashboard/chatbot")}
            className={`${navItemClasses} text-gray-700 hover:text-green-600`}
          >
            <MessageSquare className="w-6 h-6 min-w-[24px]" />
            <span
              className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              Chat
            </span>
          </div>

          <div
            onClick={() => handleNavigation("/dashboard/notifications")}
            className={`${navItemClasses} text-gray-700 hover:text-green-600`}
          >
            <Bell className="w-6 h-6 min-w-[24px]" />
            <span
              className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              Notifications
            </span>
          </div>

          <div
            onClick={() => handleNavigation("/dashboard/settings")}
            className={`${navItemClasses} text-gray-700 hover:text-green-600`}
          >
            <Settings className="w-6 h-6 min-w-[24px]" />
            <span
              className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              Settings
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: User & Logout */}
      <div className="flex flex-col w-full space-y-2">
        <div className={`${navItemClasses} text-gray-700 hover:text-green-600`}>
          <User className="w-6 h-6 min-w-[24px]" />
          <span
            className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            Profile
          </span>
        </div>

        <button
          onClick={handleLogout}
          className={`flex items-center w-full py-3 transition-all duration-300 text-red-500 hover:bg-red-50 hover:text-red-700 ${paddingClass}`}
          title="Cerrar sesión"
        >
          <LogOut className="w-6 h-6 min-w-[24px]" />
          <span
            className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  )
}

export default SideBar