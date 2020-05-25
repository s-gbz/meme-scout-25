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
        // TODO: Substitute with memeIDs when available
        const exampleMemeRef = ["tumblr_m2j9xbYh8q1r9pr63o1_500.jpg", "tumblr_m4hrgjTOiS1r9pr63o1_500.jpg", "tumblr_m4tnu5kx2s1qd5giho1_500.jpg", "tumblr_m5yxn0ms7z1r9pr63o1_500.jpg", "tumblr_m893njtVJ81r9pr63o1_500.jpg"]
        const newMemes : Meme [] = [];


        exampleMemeRef.forEach(memeRef => {
            const memeStoragePath = this.storageRef.refFromURL("gs://meme-scout-25.appspot.com/memes/" + memeRef);
            this.requestNewMeme(memeStoragePath).then(
                (newMeme) => newMemes.push(newMeme)
            );
        });
        

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

    private async requestNewMeme(memeStoragePath: firebase.storage.Reference) {
        let newMeme: Meme;

        await memeStoragePath.getDownloadURL().then(
            (newUrl) => {                
                newMeme = this.createNewMeme("abc", newUrl, ["tag1", "tag2", "tag3"])
            }
        )

        return newMeme;
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