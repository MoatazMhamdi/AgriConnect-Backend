//
//  TabBarView.swift
//  Blogs
//
//  Created by Mac-Mini_2021 on 08/11/2023.
//

import SwiftUI

struct TabBarView: View {
        
        var body: some View {
            TabView {

                HomeView()
                    .tabItem {
                        Image(systemName: "house")
                        Text("Home")
                    }
                
                FavoriteView()
                    .tabItem {
                        Image(systemName: "star")
                        Text("Favorites")
                    }
                
                SettingsView()
                    .tabItem {
                        Image(systemName: "gear")
                        Text("Settings")
                    }
            }
            .padding(EdgeInsets(top: 0, leading: 0, bottom: 20, trailing: 0))
            .frame(height: 50) // Définit la hauteur du tab bar à 50 points
            
            
        }
    }
    

