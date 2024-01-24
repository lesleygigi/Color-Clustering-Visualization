function Kmeans(k,data){
    var centroids=[];//聚类中心
    for(var i=0;i<k;i++){//随机初始聚类中心
        centroids.push(data[Math.floor(Math.random()*data.length)]);
    }
    var clusters=new Array(k);//簇
    while(true){
        for(var i=0;i<k;i++){
            clusters[i]=[];
        }
        for(var i=0;i<data.length;i++){
            var dis=new Array(k);
            for(var j=0;j<k;j++){
                dis[j]=distance(data[i],centroids[j]);//计算数据点与每个聚类中心的距离
            }
            var minidx=dis.indexOf(Math.min(...dis));
            clusters[minidx].push(data[i]);//分配数据点到最近的簇
        }
        var newCentroids=new Array(k);//计算新的聚类中心
        for(var i=0;i<k;i++){//簇
            var centroid=new Array(data[0].length);
            for(var j=0;j<data[0].length;j++){//数据维度
                var sum=0;
                for(var q=0;q<clusters[i].length;q++){//每个簇的大小
                    sum+=clusters[i][q][j];
                }
                centroid[j]=sum/clusters[i].length;
            }
            newCentroids[i]=centroid;
        }
        if(Converged(centroids,newCentroids)){
            break;
        }
        centroids=newCentroids;
    }
    for(var i=0;i<centroids.length;i++){
        for(var j=0;j<centroids[i].length;j++){
            centroids[i][j]=Math.round(centroids[i][j]);
        }
    }
    return {
        clusters:clusters,
        centroids:centroids
    };
}
function distance(p1,p2){
    var dis=0;
    for(var i=0;i<p1.length;i++){
        dis+=(p1[i]-p2[i])*(p1[i]-p2[i]);
    }
    return Math.sqrt(dis);
}
function Converged(centroids,newCentroids){
    for(var i=0;i<centroids.length;i++){
        if(distance(centroids[i],newCentroids[i])>1e-6){
            return false;
        }
    }
    return true;
}