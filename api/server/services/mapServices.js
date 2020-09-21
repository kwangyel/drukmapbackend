import database from '../src/models';

class mapServices{

	//get a subzone feature with zoneid provided
	static async getZone(zoneid){
		try {
			const result = await database.sequelize.query("select ST_AsGeoJSON(geom),subzoneid from sub_zones where subzoneid = "+zoneid+";") 
			return result[0]
		}catch (error){
			console.log(error)
		}
	}

	// static async checkZoneofPoint(lat,lng){
	// 	try{
	// 		const result = await database.sequelize.query("select a.zone_id from public.zone_prj a where ST_Intersects(ST_SetSRID(ST_Point("+lng+","+lat+"),4326), a.geom);")
	// 		return result[0]
	// 	}catch(error){
	// 		throw error
	// 	}
	// }

	
	// static async getBuildingPoints(zoneid){
	// 	try {
	// 		const result = await database.sequelize.query('select ST_AsGeoJSON(geom),id,block from thimphu_onlyzone where block='+zoneid+';')
	// 		return result[0]
	// 	}catch (error){
	// 		console.log(error)
	// 	}
	// }

	static async searchAddress(address){
		try{
			// const result = await database.sequelize.query("SELECT gid, objectid, __gid, bldg_num, street_pry, remarks, street_id, geom FROM public.building_prj where street_pry = '"+st_name+"' AND bldg_num = '"+b_name+"';");
			// const result = await database.sequelize.query("Select * from public.building_prj where SIMILARITY(street_pry,'"+st_name+"') > 0.3 and SIMILARITY(bldg_num,'"+b_name+"')>0.7;");
			//using Levenshtein algo as it yielded better results. Returns top five matches in order
			const result = await database.sequelize.query("SELECT * FROM building_address where LEVENSHTEIN(address, '"+address+"')<7 ORDER BY LEVENSHTEIN(address, '"+address+"') ASC LIMIT 5;");

			return result[0]
		}catch(error){
			console.log(error)
			throw error
		}
	}
	static async getpath(a,b){
		try{
			console.log(a)
			const result = await database.sequelize.query(`Select seq, node, edge,'cost', geom, agg_cost from pgr_dijkstra( 'Select gid as id, source, target, fact_cost as cost,fact_rcost as reverse_cost from thimphu_f',(SELECT source FROM thimphu_f ORDER BY geom <-> ST_SetSRID(ST_Point (${b.lng},${b.lat}),4326) LIMIT 1), (SELECT source FROM thimphu_f ORDER BY geom <-> ST_SetSRID(ST_Point (${a.lng},${a.lat}),4326) limit 1), true) as di JOIN thimphu_f pt ON (di.edge = pt.gid);`)
			// const result = await database.sequelize.query("Select seq, node, edge,'cost', geom from pgr_dijkstra( 'Select gid as id, source, target, cost as cost , rcost as reverse_cost from thimphu', 180,218, true) as di JOIN thimphu pt ON di.edge = pt.gid ;");

			return result[0];

		}catch(error){
			console.log(error)
			throw error
		}
	}
}
export default mapServices;
