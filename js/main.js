$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        // Make request to Github //4
       $.ajax({
          url:'https://api.github.com/users/'+username,
         data:{
         	client_id:'3d*d7c3*a*bc78033c58',
         	client_secret:'295aab06a5e3326*0cfa761*d*1cc*b37f9ac1c9'
         }
       }).done(function(user){
       	      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'97b26d4e8ed886bd89fa',
          client_secret:'f5ebe96125addf1d85c64d0c72f810011da3401f',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
       	//console.log(user);
       	$('#profile').html(`
             <div class="panel panel-default">
			  <div class="panel-heading">
			    <h3 class="panel-title">${user.name}</h3>
			  </div>
			  <div class="panel-body">
			    <div class="row">
			      <div class="col-md-3">
                    <img class="thumbnail avatar" src="${user.avatar_url}">
                   <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
			      </div>
			      <div class="col-md-9">
			      <span class="label label-default">Public Repos: ${user.public_repos}</span>
				  <span class="label label-primary">Public Gists: ${user.public_gists}</span>
				  <span class="label label-success">Followers: ${user.followers}</span>
				  <span class="label label-info">Following: ${user.following}</span>
				  <br><br>
				  <ul class="list-group">
				     <li class="list-group-item">Company: ${user.company}</li>
				      <li class="list-group-item">Website/blog: ${user.blog}</li>
				       <li class="list-group-item">Location: ${user.location}</li>
				        <li class="list-group-item">Member since: ${user.created_at}</li>
				         



			      </div>
			    </div>
			  </div>
			</div>
			 <h3 class="page-header">Latest Repos</h3>
             <div id="repos"></div>
			            `);
       });

    });
		//console.log('ready...');
});
