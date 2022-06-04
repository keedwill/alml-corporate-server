function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    address: user.address,
    email: user.phone,
    role: user.role,
    status: user.status,
    phone: user.phone,
    image:user.image,
    createdAt:user.createdAt,
  };
}


module.exports = serializeUser
