import crypto from 'crypto'

export const addRequestId = (req, res, next) => {
  const requestId = crypto.randomUUID()
  res.setHeader('RequestId', requestId)
  next()
}
