//this is an api to extract data as a dummy data for testing purposes

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


// export async function handler(req: NextApiRequest, res: NextApiResponse) {
//    if(req.method === 'POST') {
//       res.status(200).json({
//             "calories": 100,
//             "total_fat": 10,
//             "saturated_fat": 5,
//             "serving_size": 100,
//             "total_sugar": 10,
//             "protein": 10,
//             "sodium": 10,
//             "cholesterol": 10,
//             "dietary_fiber": 10,
//             "carbs": 10,
//             "added_sugar": 10
//        });
// }

// }

export async function GET(){
      return NextResponse.json({
            "calories": 100,
            "total_fat": 10,
            "saturated_fat": 5,
            "serving_size": 100,
            "total_sugar": 10,
            "protein": 10,
            "sodium": 10,
            "cholesterol": 10,
            "dietary_fiber": 10,
            "carbs": 10,
            "added_sugar": 10
       });
}

export async function POST(){
      return NextResponse.json({
            "calories": 100,
            "total_fat": 10,
            "saturated_fat": 5,
            "serving_size": 100,
            "total_sugar": 10,
            "protein": 10,
            "sodium": 10,
            "cholesterol": 10,
            "dietary_fiber": 10,
            "carbs": 10,
            "added_sugar": 10
       });
}