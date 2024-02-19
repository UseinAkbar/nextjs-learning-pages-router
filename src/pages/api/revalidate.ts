// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean,
  message?: string // tipe data message opsional untuk diberikan -> using "?"
}

// On Demand Revalidate
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {data, token} = req.query //query string
    const currentToken = process.env.REVALIDATE_TOKEN

    if(token === currentToken) {
        if(data === 'product') {
            try {
                await res.revalidate('/product/static')
                return res.json({revalidated: true})
            } catch (error) {
                res.status(500).send({revalidated: false})
            }
        }
        return res.json({
            revalidated: false,
            message: 'Select your data first!'
        })
    } else {
        res.status(401).json({revalidated: false, message: 'Insert correct token!'})
    }
    
}
