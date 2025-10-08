let UUID = 0;
export default function uniqueID() {
    const getID = ():string => {
        UUID ++
        return String(UUID)
    }
    return {
        getID
    }
}