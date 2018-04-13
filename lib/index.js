var Transform= require('stream').Transform;

module.exports= function (callbackFunc,reduct={},pvl) {
	//pvl=pastValuesLength
	var previuosVals= pvl ? new Array(pvl).fill({}) : [];

	return new Transform({
		transform: function (chunk,enc,callback) {
			var obj= JSON.parse(chunk.toString());

			callback(null,JSON.stringify(callbackFunc(reduct,obj,previuosVals))+'\n');

			if(previuosVals.length>0)
			{
				previuosVals.shift();
				previuosVals.push(obj);
			}
		}
	});
}