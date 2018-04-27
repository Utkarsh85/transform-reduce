var Transform= require('stream').Transform;

module.exports= function (callbackFunc,reduct={},pvl) {
	//pvl=pastValuesLength
	var previuosVals= pvl ? new Array(pvl).fill({}) : [];

	return new Transform({
		transform: function (chunk,enc,callback) {
			var obj= JSON.parse(chunk.toString());

			var output= callbackFunc(reduct,obj,previuosVals);

			if(output)
				callback(null,JSON.stringify(output)+'\n');
			else
				callback(null);

			if(previuosVals.length>0)
			{
				previuosVals.shift();
				previuosVals.push(obj);
			}
		}
	});
}