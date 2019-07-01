
    new Vue({ 
        el: '#app',
        data: {
            categories: [],
            selected_category:{},
            images: [],
            order:'Desc',
            page: 1,
            limit: 9,
            pagination_count: 0, //default until we get a result with the 'Pagination-Count' header in the response
        },
        created(){
            this.getCategories();
            //this.getImages();
        } ,
        watch: {
            // if the user changes any of these values, then make a new request to the API
            page: function()
            {
                this.getImages();
            },
            limit: function()
            {
                this.getImages();
            },
            order: function()
            {
                this.getImages();
            },
            selected_category: function()
            {
                console.log(this.selected_category)
                this.getImages();
            }
        },
        computed:{
            getNumPages: function()
            {
            return Math.floor(this.pagination_count / this.limit) | 0;
            }
        },
        methods:{
            async nextBtn()
            {
                this.page++;
                await this.getImages();
            },
            async getCategories()
            {
                try{
  
                    axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace this with your API Key, as it's set to defaults it will be used from now onwards
                    
                    let response = await axios.get('https://api.thecatapi.com/v1/categories/' ) 
                    this.categories = response.data;
                    console.log("-- ("+this.categories.length +") Categories from TheCatAPI.com")
                    
                    // pick one to display initially
                    this.selected_category = this.categories[2]
                }catch(err){
                    console.log(err)
                }
            },
            async getImages()
            {
                try{
                    axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace this with your API Key
                    
                    let query_params = {
                        limit: this.limit,
                        order: this.order,
                        page: this.page-1,
                        category_ids: this.selected_category.id
                    }
                    let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params } ) 
                    
                    this.pagination_count = response.headers['pagination-count'];
                    this.images = response.data 
                    console.log("-- ("+this.images.length +") Images from TheCatAPI.com")
                    console.log( this.pagination_count ,'images available for this query.')
                    
                }catch(err){
                    console.log(err)
                }
            }
        }
    })