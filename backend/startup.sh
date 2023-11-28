wget -O - https://www.openssl.org/source/openssl-1.1.1u.tar.gz | tar zxf -
cd openssl-1.1.1u
./config --prefix=/usr/local
make -j $(nproc)
sudo make install_sw install_ssldirs
sudo ldconfig -v
export SSL_CERT_DIR=/etc/ssl/certs
rm -rf openssl-1.1.1u
sudo apt-get update
sudo apt-get install build-essential libssl-dev ca-certificates libasound2 wget
gunicorn --bind 0.0.0.0 --threads 8 --timeout 600 --access-logfile '-' --error-logfile '-' app:app