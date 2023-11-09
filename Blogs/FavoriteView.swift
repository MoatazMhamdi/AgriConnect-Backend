

import SwiftUI
struct FavoriteView: View{
    var body: some View{
        NavigationView{
            Text("Myrecipes")
                .padding()
                .navigationTitle("Favorites")
        }
            
        
    }
}
struct FavoritesView_Previews:PreviewProvider{
    static var previews:some View{
        FavoriteView()
    }
}

