
export type Livre = {
    id: string;
    name: string;
    author: string;
    status: string;
    summary: string;
    book_text: string;
    themes: string[],
    cover: string;
    covers: {
        persona_name: string,
        persona_picture: string,
        content: string
    }[];
    open: boolean;
}