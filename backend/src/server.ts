import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

interface User {
  email: string
  number: string
}

const users: User[] = [
  { email: 'jim@gmail.com', number: '221122' },
  { email: 'jam@gmail.com', number: '830347' },
  { email: 'john@gmail.com', number: '221122' },
  { email: 'jams@gmail.com', number: '349425' },
  { email: 'jams@gmail.com', number: '141424' },
  { email: 'jill@gmail.com', number: '822287' },
  { email: 'jill@gmail.com', number: '822286' }
]

app.post('/search', (req: Request, res: Response) => {
  const { email, number } = req.body

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  const numberRegex = /^\d*$/
  if (number && !numberRegex.test(number)) {
    return res.status(400).json({ message: 'Invalid number format' })
  }

  setTimeout(() => {
    const results = users.filter(
      (user) => user.email === email && (!number || user.number === number)
    )
    res.json(results)
  }, 5000)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
