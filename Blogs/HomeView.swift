//
//  HomeView.swift
//  Blogs
//
//  Created by Mac-Mini_2021 on 08/11/2023.
//

import SwiftUI
struct HomeView: View{
    var body: some View{
        NavigationView{
            Text("Myrecipes").navigationTitle("My Receipes")
        }
            
        
    }
}
struct HomeView_Previews:PreviewProvider{
    static var previews:some View{
        HomeView()
    }
}
