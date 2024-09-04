import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';



const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Middleware para autenticação
app.use((req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, 'secret') as User;
        req.user = decoded; // Definindo a propriedade `user`
        console.log(req.user); // Verifique se `user` está acessível
      } catch (error) {
        return res.status(401).send('Unauthorized');
      }
    }
    next();
  });
  

app.post('/users', async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const user = await prisma.user.create({
    data: { email, name, password },
  });
  res.json(user);
});

app.get('/users/me', async (req: Request, res: Response) => {
  if (req.user) {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    res.json(user);
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
