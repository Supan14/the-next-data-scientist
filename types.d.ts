type Meta = {
    id: string,
    title: string,
}

type BlogPost = {
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type SubjectDict = {
    [subject: string]: SubjectDict | BlogPost
}