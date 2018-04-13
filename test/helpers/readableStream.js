var Readable= require('stream').Readable;

module.exports= function (limit=10) {
	var count=0;
	return new Readable({
		read: function () {
			
			if(count < limit)
				this.push(count);
			else
				this.push(null);
		}
	})
}