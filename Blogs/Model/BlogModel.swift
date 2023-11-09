//
//  BlogMode.swift
//  Blogs
//
//  Created by Mac-Mini_2021 on 08/11/2023.
//

import Foundation
//
//  Blogs.swift
//  Blogs
//
//  Created by Mac-Mini_2021 on 08/11/2023.
//

import Foundation
struct BlogModel :Identifiable{
    
    var id = UUID().uuidString
    var image:String
    var titre: String
    var description: String
    var lieu: String
    var prix: Int    //
}
    //  Blogs.swift
    //  Blogs
    //
    //  Created by Mac-Mini_2021 on 08/11/2023.
    //

    
var blogs : [BlogModel] = [ BlogModel(image: "beautiful-shot-fence-leading-house-green-grass-area", titre: "hello", description:" hello", lieu: "paris ", prix: 20),
                                BlogModel(image: "vertical-shot-ripe-unripe-cherry-tomatoes-branch", titre: "h", description:" g", lieu: "london ", prix: 20),
                                BlogModel(image: "vertical-shot-ripe-unripe-cherry-tomatoes-branch", titre: "b", description:" b", lieu: "tunis ", prix: 20),
                            BlogModel(image: "vertical-shot-ripe-unripe-cherry-tomatoes-branch", titre: "Read!", description:"Farming activity means the cultivation of farmland for the production of crops fruits vegetables ornamental and flowering plants and the utilization of farmland for the production of dairy livestock poultry and all other forms of agricultural products having a domestic or foreign market", lieu: "tunis ", prix: 0),
]



