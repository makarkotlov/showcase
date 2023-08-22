watchman watch-del-all
rm -rf node_modules android/build android/app/build ios/build ~/Library/Developer/Xcode/DerivedData ios/Pods
yarn
cd android
./gradlew clean
cd ..
cd ios
pod install
cd ..
npx react-native start --reset-cache
