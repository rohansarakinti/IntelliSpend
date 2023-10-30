import client from "../instance"

export default async function getLinkToken(uid: string) {
    const response = await client.post("/get_link_token", { uid })
    if (response.data.error) {
        throw new Error(response.data.errorMessage)
    } else {
        return response.data.link_token
    }
}