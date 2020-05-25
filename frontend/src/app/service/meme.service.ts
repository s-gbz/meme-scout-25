import { Injectable } from '@angular/core';
import { Meme } from '../shared/model/meme';
import { MemeRating } from '../shared/model/meme-rating';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})

export class MemeService{

    private storageRef = this.afStore.storage;

    constructor(private afStore:AngularFireStorage ) { }
    
    public async getMemes(): Promise<Meme []> {
        const exampleMemeRef = "gs://meme-scout-25.appspot.com/memes/tumblr_m2j9xbYh8q1r9pr63o1_500.jpg";
        const memeStoragePath = this.storageRef.refFromURL(exampleMemeRef);
        const newMemes : Meme [] = [];

        await memeStoragePath.getDownloadURL().then(
            (url) => {                
                newMemes.push(this.createNewMeme("abc", url, ["tag1", "tag2", "tag3"]));
            }
        )

        return newMemes;
    }

    public rateMeme(memeRating: MemeRating) {
        // TODO: Adapt to new backend Function;
    }

    public uploadMemes(memeIds: string [], files: File []) {
        const path = "memes/" + memeIds[0];
        const file = files[0];
        
        this.afStore.upload(path, file);

    }

    private createNewMeme(id: string, fileUrl: string, tags? :string []): Meme {
        console.log(fileUrl);

        return {
            id: id,
            fileUrl: fileUrl,
            tags: tags
        }
    }
}