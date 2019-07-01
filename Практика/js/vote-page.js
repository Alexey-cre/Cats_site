 new Vue({ 
        el: '#app',
        data: {
          sub_id: "Name",
          image:{},
          votes:[],
            headers: [
            { text: 'date' },
            { text: 'image_id' },
            { text: 'value' },
            { text: 'sub_id' },
            { text: 'country' }
          ],
        },
        created(){
            this.getImage();
            this.getVotes();
        } ,
        methods:{
            async getImage()
            {
                try{
                    axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace this with your API Key, as it's set to defaults it will be used from now onwards
                    let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:3, size:"full" } } ) // Ask for 1 Image, at full resolution
                    this.image = response.data[0] // the response is an Array, so just use the first item as the Image
                    console.log("-- Image from TheCatAPI.com")
                    console.log("id:", this.image.id)
                    console.log("url:", this.image.url)
                }catch(err){
                    console.log(err)
                }
            },
            async voteUp(){
              let body = {
                  image_id: this.image.id,
                  sub_id: this.sub_id,
                  value: 1 // Voting up (you like it) so send 1
              }
              let response = await axios.post('https://api.thecatapi.com/v1/votes', body ) // Send the body to create a Vote in your Account
                    
              await this.getImage();
              await this.getVotes();
            },
            async voteDown(){
              let body = {
                  image_id: this.image.id,
                  sub_id: this.sub_id,
                  value: 0 // Voting down (you don't like) so send 0
              }
              let response = await axios.post('https://api.thecatapi.com/v1/votes', body ) // Send the body to create a Vote in your Account
                    
              await this.getImage();
              await this.getVotes();
            },
            async getVotes()
            {
              let response = await axios.get('https://api.thecatapi.com/v1/votes', { params: { order:"DESC", limit:25 } } ) // Get the last 25 votes
              
              response.data.forEach(element => {
                //element.created_at = new Date(element.created_at).toString();// full time string including timezone
                element.created_at = new Date(element.created_at).toJSON().slice(0,10)// just use the date for now
              });
              this.votes = response.data;
            }
        }
    })