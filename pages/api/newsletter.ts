import {NextApiRequest, NextApiResponse} from "next";
import {MongoClient} from "mongodb";

async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const userEmail = req.body.email

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid email address.'})
            return
        }

        const client =  await MongoClient.connect(
            'mongodb+srv://tatiana:STe6IzNBZlFKw4jo@cluster0.fmv6a.mongodb.net/events?retryWrites=true&w=majority'
        )
        const db = client.db()
        await db.collection('newsletter').insertOne({email: userEmail})
        client.close()

        res.status(201).json({message: 'Signed up!'})
    }
}

export default handler
