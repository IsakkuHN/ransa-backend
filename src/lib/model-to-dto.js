export async function userToDto(user) {
  const responseUser = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isActive: user.isActive,
  }

  return responseUser
}

export async function roleToDto(role) {
  return { id: role.id, name: role.name, description: role.description }
}
