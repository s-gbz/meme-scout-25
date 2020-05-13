export interface Meme { 
    id: number;
    fileBlob: string;
    tags: {
        tag1: string,
        tag2: string,
        tag3: string
    };
}