#include <iostream>
#include <vector>
#include <map>
#include <fstream>

int main() {
    std::ifstream fin("input.txt");
    long long num;
    long long ans = 0;
    std::vector<long long> input;
    std::map<std::string, long long> mp;
    while (fin >> num) {
        input.emplace_back(num);
        std::map<std::string, long long> mp2;
        std::vector<long long> v;
        std::vector<long long> v2;
        for (int i = 0; i < 2000; i++) {
            long long pre = num;
            num = (num * 64) ^ num;
            num = num % 16777216;
            num = (num / 32) ^ num;
            num = num % 16777216;
            num = (num * 2048) ^ num;
            num = num % 16777216;
            v.emplace_back(num % 10 - pre % 10);
            v2.emplace_back(num % 10);
            if (i >= 3) {
                std::string s = "";
                for (int j = 0; j < 4; j++) {
                    s += std::to_string(v[i - j]);
                }
                if (!mp2.count(s)) {
                    mp2[s] = v2[i];
                    mp[s] += v2[i];
                    ans = std::max(ans, mp[s]);
                }
            }
        }
    }
    std::cout << ans << std::endl;
    return 0;
}
