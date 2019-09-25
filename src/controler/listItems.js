module.exports = {

    async listItems(items, pageActual, limitItemns){
        limitItems = Math.ceil(limitItemns)
        if(pageActual && limitItems){
            let result = [];
        const totalPage = Math.ceil( items.length / limitItems );
        let count = ( pageActual * limitItems ) - limitItems;
        const delimiter = count + limitItems;
        
        if(pageActual <= totalPage){
            for(let i=count; i<delimiter; i++){
                if(items[i] != null){
                    result.push(items[i]);
                }
                count++;
            }
        }
    
        return result;
        }else{
            return items
        } 
    }

}

