module.exports = {

    async listItems(item, pageActual, limitItemns){
        limitItems = Math.ceil(limitItemns)
		items = item.reverse()
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

