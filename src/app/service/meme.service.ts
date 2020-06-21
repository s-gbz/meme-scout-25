import { Injectable } from '@angular/core';
import { Meme } from '../shared/model/meme';
import { MemeRating } from '../shared/model/meme-rating';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})

export class MemeService {

    private storageRef = this.afStore.storage;

    constructor(private userService: UserService, private afStore: AngularFireStorage, private afDatabase: AngularFireDatabase) { }

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

    public uploadMemes(files: File[]) {
        const basePath = "memes/";
        const pathReferences = [];
        const newIds = [];

        for (let i = 0; i < files.length; i++) {
            const newId = this.afDatabase.createPushId();
            newIds.push(newId);
            pathReferences.push(basePath + newId);
        }

        for (let i = 0; i < files.length; i++) {
            this.afStore.upload(pathReferences[i], files[i])
                .then(_ => console.log(`Meme upload ${i+1}/${files.length} successful`))
                .catch(err => console.log(err, `Meme upload ${i+1}/${files.length} failed`));
        }

        const uid = this.userService.getAuthenticatedUser().uid;

        this.afDatabase.list(`uploadedMemes/${uid}`).push(newIds)
            .then(_ => console.log('UploadedMemes push successful'))
            .catch(err => console.log(err, 'UploadedMemes push failed'));
    }

    public getUserUploadedMemeReferences() {
        const uid = this.userService.getAuthenticatedUser().uid;

        return this.afDatabase.list(`uploadedMemes/${uid}`).valueChanges();
    }

    public getUserUploadedMemesByReference(memeReferences) {
        console.log("all values: " + memeReferences);
        // this.afStore.ref(memeReferences[0]).getDownloadURL().subscribe()
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