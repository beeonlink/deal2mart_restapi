export const success = (res, status, message) => (entity) => {
  if (entity) {
    res.status(status || 200).json(message ? { valid: true, message: message } : entity)
  }
  return null
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'ADMIN';
    const isAuthor = entity[userField] && entity[userField] == user.id;
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
