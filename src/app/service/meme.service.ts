import { Injectable } from '@angular/core';
import { Meme } from '../shared/model/meme';
import { MemeRating } from '../shared/model/meme-rating';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})

export class MemeService {

    private storageRef = this.afStore.storage;

    constructor(private afStore: AngularFireStorage, private afDatabase: AngularFireDatabase) { }

    public async getMemes(): Promise<Meme[]> {
        // TODO: Substitute with memeIDs when available
        const exampleMemeRef = ["tumblr_m2j9xbYh8q1r9pr63o1_500.jpg", "tumblr_m4hrgjTOiS1r9pr63o1_500.jpg", "tumblr_m4tnu5kx2s1qd5giho1_500.jpg", "tumblr_m5yxn0ms7z1r9pr63o1_500.jpg", "tumblr_m893njtVJ81r9pr63o1_500.jpg"]
        const newMemes: Meme[] = [];

        for (let index = 0; index < exampleMemeRef.length; index++) {
            const memeStoragePath = this.storageRef.refFromURL("gs://meme-scout-25.appspot.com/memes/" + exampleMemeRef[index]);

            await this.requestNewMeme(memeStoragePath).then(
                (newMeme) => newMemes.push(newMeme)
            );
        }

        return newMemes;
    }

    public rateMeme(memeRating: MemeRating) {
        // TODO: Adapt to new backend Function;
    }

    public uploadSingleMeme(filePath: string) {
        const path = "memes/" + "testMeme";
        // const file = new File();

        // this.afStore.upload(path, file);
        const newId = this.afDatabase.createPushId();
        console.log(newId);
        
    }

    public uploadMemes(memeIds: string[], files: File[]) {
        const path = "memes/" + memeIds[0];
        const file = files[0];

        this.afStore.upload(path, file).then(_ => console.log('Meme upload successful'))
        .catch(err => console.log(err, 'Meme upload failed'));
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

    private createNewMeme(id: string, fileUrl: string, tags?: string[]): Meme {
        return {
            id: id,
            fileUrl: fileUrl,
            tags: tags
        }
    }
}