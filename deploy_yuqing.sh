rm -r yuqing
rm yuqing.tar.gz
npm run build
tar -zcvf yuqing.tar.gz yuqing/
scp yuqing.tar.gz root@115.29.103.29:/home/yuqing/apache-tomcat-7.0.63/webapps/


