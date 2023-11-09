import SwiftUI

struct ContentView: View {
    @State private var isNavigationBarHidden: Bool = true
    @State private var selectedFilter = "Recommended"
    let filters = ["Recommended", "Popular","offre"]

    var body: some View {
        NavigationView {
            VStack {
                Picker("Filter", selection: $selectedFilter) {
                    ForEach(filters, id: \.self) { filter in
                        Text(filter)
                    }
                }
                .pickerStyle(SegmentedPickerStyle())
                .padding()

                ScrollView {
                    ForEach(blogs) { blog in
                        NavigationLink(destination: BlogView(blog: blog)) {
                            BlogsView(image: blog.image, titre: blog.titre, description: blog.description, lieu: blog.lieu, prix: blog.prix, blog: BlogModel(image: blog.image, titre: blog.titre, description: blog.description, lieu: blog.lieu, prix: blog.prix))
                        }
                    }
                }
                .padding()
                TabBarView()
            }
            .navigationTitle("Blogs")
            .navigationBarItems(
                leading: HStack { // Ajout du logo en haut à gauche
                    Image("2") // Assurez-vous que "logo" correspond au nom de votre image
                        .resizable()
                        .frame(width: 100, height: 50) // Ajustez la taille selon vos besoins
                },
                trailing: HStack {
                    Button(action: {
                        // Code pour gérer l'action du premier bouton
                    }) {
                        Image("magnifying-glass")
                            .resizable()
                            .frame(width: 50, height: 50)
                    }
                    Button(action: {
                        // Code pour gérer l'action du deuxième bouton
                    }) {
                        Image("menu-bar")
                            .resizable()
                            .frame(width: 50, height: 50)
                    }
                }
            )
            .navigationBarHidden(self.isNavigationBarHidden)
            .onAppear {
                self.isNavigationBarHidden = false
            }
            .onDisappear {
                self.isNavigationBarHidden = true
            }
        }
    }

    // ... Reste de votre code ...

    // Assurez-vous d'ajuster le chemin de l'image "logo" en fonction de l'emplacement de votre image dans le projet.
}


    struct ContentView_Previews: PreviewProvider {
        static var previews: some View {
            ContentView()
        }
    }

    struct BlogsView: View {
        var image: String
        var titre: String
        var description: String
        var lieu: String
        var prix: Int

        var blog: BlogModel
        var body: some View {
            VStack {
                Image(blog.image)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                
                HStack {
                    VStack(alignment: .leading) {
                        Text(blog.titre)
                            .font(.title)
                            .fontWeight(.black)
                            .foregroundColor(.primary)
                        Text(blog.description)
                            .font(.headline)
                            .foregroundColor(.secondary)
                            .lineLimit(3)
                        Text("Localisation " + blog.lieu.uppercased())
                            .font(.caption)
                            .foregroundColor(.primary)
                    }
                    .layoutPriority(100)
                    Spacer()
                }
                .padding()
            }
            .cornerRadius(10)
            .overlay(RoundedRectangle(cornerRadius: 10)
                .stroke(Color(.sRGB, red: 150/255, green: 150/255, blue: 150/255, opacity: 0.2), lineWidth: 1)
            )
            .padding(.bottom)
        }
    }

struct BlogView: View {
    var blog: BlogModel

    var body: some View {
        ScrollView {
            VStack {
                Image(blog.image)
                    .resizable()
                    .scaledToFill()
                    .frame(maxWidth: .infinity, maxHeight: 300)
                    .clipped()
                    .cornerRadius(10)
                    .padding(.bottom, 10)

                VStack(alignment: .leading, spacing: 10) {

                    Text(blog.description)
                        .fontWeight(.bold)
                        .font(.largeTitle)
                        .foregroundColor(.primary)
                        .lineLimit(3)

                    Text("Localisation: " + blog.lieu.uppercased())
                        .font(.callout)
                        .foregroundColor(.primary)
                    
                    HStack {
                        Button(action: {
                            // Code pour gérer l'action du premier bouton
                        }) {
                            Image("button-icon-1") // Remplacez "button-icon-1" par le nom de votre icône
                                .resizable()
                                .frame(width: 50, height: 50)
                        }
                        
                        Button(action: {
                            // Code pour gérer l'action du deuxième bouton
                        }) {
                            Image("receipt") // Remplacez "button-icon-2" par le nom de votre icône
                                .resizable()
                                .frame(width: 50, height: 50)
                        }
                       
                    
                    }
                }
                .padding()

                Spacer()
            }
        }
        .cornerRadius(10)
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .stroke(Color(.sRGB, red: 150/255, green: 150/255, blue: 150/255, opacity: 0.2), lineWidth: 1)
        )
        .padding(.horizontal, 20)
        .navigationBarTitle(blog.titre)
    }
}
