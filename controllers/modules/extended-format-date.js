var website = website || {};

website.module = website.module || {};

website.module.extendedFormatDate = function (date, variations) {
	var format = {},
		minute = date.getMinutes(),
		hour = date.getHours(),
		day = date.getDate(),
		month = date.getMonth() + 1,
		fullMonth = variations.months[date.getMonth()],
		fullYear = date.getFullYear();

	minute = ((minute.toString().length > 1) ? '' : '0') + minute;
	hour = ((hour.toString().length > 1) ? '' : '0') + hour;
	day = ((day.toString().length > 1) ? '' : '0') + day;
	month = ((month.toString().length > 1) ? '' : '0') + month;

	format.string = 
		variations.toDate + " " +
		day + " " +
		fullMonth + " " +
		fullYear + " " +
		variations.toHour + " " +
		hour +
		variations.unitHours +
		minute;

	format.time = 
		fullYear + "-" + month + "-" + day + "T" + hour + ":" + minute + ":00.000";

	return format;
};

if (typeof module === 'object') {
	module.exports = website.module.extendedFormatDate;
}