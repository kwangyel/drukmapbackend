import mapServices from '../services/mapServices';
import Util from '../utils/Utils';

const util=new Util();

class mapController{

	static async getzone(req,res){
		const {zoneid} = req.params
		if(isNaN(zoneid)){
			util.setSuccess(200,"Sub zone id is not valid")
			return util.send(res)
		}
		try{
			const result = await mapServices.getZone(zoneid)
			if(result.length){
				const resp = result.map((row)=>{
					let geojson=JSON.parse(row.st_asgeojson);
					geojson.properties = {subzoneid: row.subzoneid}
					return geojson;
				})
				util.setSuccess(200,'success');
				util.setData(resp);
			}else{
				util.setSuccess(200,'Data not found');
			}
			return util.send(res)
		}catch(error){
			util.setError(400,error)
			return util.send(res)
		}
	}
	
	// static async checkPointInZone(req,res){
	// 	const zone_id = req.body.zone_id;
	// 	const lat = req.body.lat;
	// 	const lng = req.body.lng;
	// 	try{
	// 		const valid_zone = await mapServices.getZone(zone_id)
	// 		if(valid_zone){
	// 			const pointZone = await mapServices.checkZoneofPoint(lat,lng)
	// 			if(pointZone[0]['zone_id'] == zone_id){
	// 				util.setSuccess(200,"Location within zone")
	// 			}else{
	// 				util.setFailure(200,"Location outside zone")
	// 			}
	// 		}else{
	// 			util.setError(400,"Zone id not found")
	// 		}
	// 		return util.send(res);
	// 	}catch(error){
	// 		console.log(error)
	// 		util.setError(400,error)
	// 		return util.send(res)
	// 	}
	// }

	// static async getBuildingPoint(req,res){
	// 	const {zoneid} = req.params;
	// 	try{
	// 		const valid_zone = await mapServices.getZone(zoneid)
	// 		if(!valid_zone){
	// 			util.setError(400,"Zone id not found")
	// 			return util.send(res)
	// 		}
	// 		const buildings= await mapServices.getBuildingPoints(zoneid);
	// 		if(buildings.length > 0){
	// 			const result = buildings.map((row)=>{
	// 				let geojson=JSON.parse(row.st_asgeojson);
	// 				geojson.properties = {id: row.id, block: row.block}
	// 				return geojson;
	// 			})
	// 			util.setSuccess(200,'Buildings Retrieved');
	// 			util.setData(buildings);
	// 		}else{
	// 			util.setSuccess(200,'No buildings found');
	// 		}
	// 		return util.send(res);
	// 	}catch(error){
	// 		console.log(error);
	// 		util.setError(400, error);
	// 		return util.send(res);
	// 	}
	// }

	static async searchAddress(req,res){
		const {address} = req.params
		try{
			const places = await mapServices.searchAddress(address);
			if(places.length){
				util.setSuccess(200,"found places");
				util.setData(places);
			}else{
				util.setFailure(200,"Address doesn't exist");
			}
			return util.send(res);
		}catch(err){
			util.setError(400,err);
			return util.send(res);
		}
	}

	static async getpath(req,res){
		const a = req.body.pointa;
		const b = req.body.pointb;
		try{
			const path = await mapServices.getpath(a,b);

			if(path.length){
				const thepath = path.map((row)=>{
					let geojson = {"type":"MultiLineString"}
					geojson.properties = {id:row.seq}
					geojson.coordinates = row.geom.coordinates
					return geojson
				})
				util.setSuccess(200,"found places");
				util.setData(thepath);
			}else{
				util.setFailure(200,"Address doesn't exist");
			}
			return util.send(res);
		}catch(err){
			util.setError(400,err);
			return util.send(res);
		}
	}
}

export default mapController;