
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://backend-linker.onrender.com"
const BRAND_AVATAR_BG = "4FD04C"

export const getImageUrl = (path, type = "avatar", username = "User") => {
  if (!path) {
    if (type === "avatar") {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        username,
      )}&size=200&background=${BRAND_AVATAR_BG}&color=fff&bold=true`
    }
    // Retourner un SVG placeholder inline pour éviter les erreurs réseau
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPgogICAgSW1hZ2Ugbm9uIGRpc3BvbmlibGUKICA8L3RleHQ+Cjwvc3ZnPg=="
  }

  if (path.startsWith("http") || path.startsWith("blob:") || path.startsWith("data:")) {
    // Remplacer les anciennes couleurs d'avatar par le thème vert
    if (type === "avatar" && path.includes("ui-avatars.com") && path.includes("background=")) {
      return path.replace(/background=[a-fA-F0-9]+/, `background=${BRAND_AVATAR_BG}`)
    }
    return path
  }

  // Ensure path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${BACKEND_URL}${cleanPath}`
}

export const handleImageError = (e) => {
  // Remplacer l'image par un placeholder SVG en cas d'erreur
  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPgogICAgSW1hZ2Ugbm9uIGRpc3BvbmlibGUKICA8L3RleHQ+Cjwvc3ZnPg=="
}
