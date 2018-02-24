import * as request from 'request';
import { Users } from './Users';
import { Repo } from './Repo';

const OPTIONS: any = {
    headers:{
        'User-Agent':'request'
    },
    json:'true'
};

export class GithubApiService{
    
    getUserInfo(userName: string, cb: (user : Users) => any) {
        request.get('https://api.github.com/users/' + userName, OPTIONS , (error:any, response: any, body: any)=>{
            // console.log("Error :" + error);
            // console.log("Response :" + response);
            // console.log("Body :" + body);
            // let user = new Users(JSON.parse(body));
            let user = new Users(body);
            cb(user);
        });
    }
    getRepos(userName: string,cb : (repoArray: Repo[]) => any) {
        request.get('https://api.github.com/users/' + userName + '/repos', OPTIONS , (error:any, response: any, body: any)=>{
            var repos = body.map((repo: any) => new Repo(repo));
            cb(repos);
        });
    }
}