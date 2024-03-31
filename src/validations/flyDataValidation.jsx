import z, { string } from "zod"

const flyDataValidation = z.object({
    name: string().min(6, { message: "must be atlist 6 notes" }),
    password: string().min(6, { message: "password must be atlist 6 notes" }),
    playerType: string()

})

export { flyDataValidation}