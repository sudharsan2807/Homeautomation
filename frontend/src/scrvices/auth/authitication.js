import { ID_GET } from "./storge"

export default function Auth() {
    const id1 = "651589e5a4dfc29b9fce3542"
    const id2 = "651589f7a4dfc29b9fce354c"
    if (ID_GET() !== null) {
        return ID_GET() === id1 || id2 ? true : false
    }
}
