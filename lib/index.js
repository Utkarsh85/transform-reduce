var Transform= require('stream').Transform;

module.exports= function (callbackFunc,reduct={},pvl) {
	//pvl=pastValuesLength
	var previuosVals= pvl ? new Array(pvl).fill({}) : [];

	return new Transform({
		transform: function (chunk,enc,callback) {
			var str= chunk.toString();

			if(str.charAt(0) == '{')
				var obj= JSON.parse(chunk.toString());
			else
				var obj= str;

			var output= callbackFunc(reduct,obj,previuosVals);

			if(typeof(output) == "object")
				callback(null,JSON.stringify(output)+'\n');
			else if(output)
				callback(null,String(output)+'\n');
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