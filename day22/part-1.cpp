#include <iostream>
#include <fstream>

int main() {
    std::ifstream fin("input.txt");
    long long num;
    long long ans = 0;
    
    while (fin >> num) {
        for (int i = 0; i < 2000; i++) {
            num = (num * 64) ^ num;
            num = num % 16777216;
            num = (num / 32) ^ num;
            num = num % 16777216;
            num = (num * 2048) ^ num;
            num = num % 16777216;
        }
        ans += num;
    }
    std::cout << ans << std::endl;
    return 0;
}
