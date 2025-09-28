#include <iostream>
#include <string>
using namespace std;

struct Weather {
    string city;
    double temp;
    string desc;
    int humidity;
};

int main() {
    Weather w = {"Paris", 24.5, "clear sky", 58};
    cout << "Destination: " << w.city << endl;
    cout << "Temperature: " << w.temp << "°C" << endl;
    cout << "Condition: " << w.desc << endl;
    cout << "Humidity: " << w.humidity << "%" << endl;
    return 0;
}
