import { GithubApiService } from './GithubApiService'
import { Users } from './Users';
import { Repo } from './Repo';
import * as _ from 'lodash';

console.log('Index');
let svc = new GithubApiService();
console.log(process.argv[2]);

if(process.argv.length < 3){
    console.log("Please pass the username as an argument."); 
}
else{
    let userName = process.argv[2];


svc.getUserInfo(userName, (user: Users)=>{

    svc.getRepos(userName, (repos : Repo[]) => {
        // let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.forkCount]);
        let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.forkCount*-1]); 
        user.repos = _.take(sortedRepos,5);
        console.log(user);
    })
});
}