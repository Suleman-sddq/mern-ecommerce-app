import bcrypt from 'bcrypt'


const users = [
   {
      name: 'Admin User',
      email: 'admin@email.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true
   },
   {
      name: 'Ahmad Sheraz',
      email: 'ahmad@email.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false
   },
   {
      name: 'Qasim Ali',
      email: 'qasim@email.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false
   },
]


export default users;