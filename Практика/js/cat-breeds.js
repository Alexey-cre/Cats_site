    new Vue({ 
        el: '#app',
        data: {
            country_flag_url:"",
          images: [],
          breeds:[],
          selected_breed: {},
          current_image: {}
        },
        created(){
            this.getBreeds();
        } ,
        watch: {
           
            selected_breed: function()
            {
                console.log(this.selected_breed)
                let country_code = this.selected_breed.country_code.toLowerCase();
                this.country_flag_url = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${country_code}.svg`;
                this.getImages();
            }
        },
        methods:{
            async getBreeds()
            {
                try{
                    axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace this with your API Key, as it's set to defaults it will be used from now onwards
                    
                    let response = await axios.get('https://api.thecatapi.com/v1/breeds/' ) 
                    this.breeds = response.data;
                    console.log("-- ("+this.breeds.length +") Breeds from TheCatAPI.com")
                    
                    // pick one to display initially
                    this.selected_breed = this.breeds[10]
                }catch(err){
                    console.log(err)
                }
            },
            async getImages()
            {
                try{
                    
                    let query_params = {
                        breed_ids: this.selected_breed.id,
                        limit:8
                    }
                    let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params} ) 
                    
                    this.pagination_count = response.headers['pagination-count'];
                    this.images = response.data 
                    this.current_image = this.images[0]
                    
                    console.log("-- ("+this.images.length +") Images from TheCatAPI.com")
                    console.log( this.pagination_count ,'images available for this query.')
                    
                }catch(err){
                    console.log(err)
                }
            }
            
        }
    })